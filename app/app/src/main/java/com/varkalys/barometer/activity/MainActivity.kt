package com.varkalys.barometer.activity

import android.Manifest.permission
import android.content.pm.PackageManager
import android.hardware.Sensor
import android.hardware.SensorEvent
import android.hardware.SensorEventListener
import android.hardware.SensorManager
import android.location.Location
import android.os.Bundle
import android.os.Looper
import android.util.Log
import androidx.annotation.RequiresPermission
import androidx.appcompat.app.AppCompatActivity
import androidx.core.app.ActivityCompat
import com.google.android.gms.location.LocationCallback
import com.google.android.gms.location.LocationRequest
import com.google.android.gms.location.LocationResult
import com.google.android.gms.location.LocationServices
import com.varkalys.barometer.api.Api
import com.varkalys.barometer.api.entity.DataPoint
import kotlinx.android.synthetic.main.activity_main.*
import kotlinx.coroutines.Dispatchers
import kotlinx.coroutines.GlobalScope
import kotlinx.coroutines.delay
import kotlinx.coroutines.launch
import retrofit2.Retrofit
import retrofit2.converter.gson.GsonConverterFactory
import java.util.concurrent.TimeUnit


class MainActivity : AppCompatActivity() {

    private lateinit var api: Api
    private var isActive = false
    private var lastLocation: Location? = null
    private var lastSensorData: Double? = null;

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        setContentView(R.layout.activity_main)
        initRetrofit()
        if (ActivityCompat.checkSelfPermission(this, permission.ACCESS_FINE_LOCATION) != PackageManager.PERMISSION_GRANTED) {
            ActivityCompat.requestPermissions(this, arrayOf(permission.ACCESS_FINE_LOCATION), 1)
        } else {
            startListeningToData()
            startDataSendLoop()
        }
    }

    private fun initRetrofit() {
        val retrofit = Retrofit.Builder()
            .baseUrl("http://192.168.0.114:5000/")
            .addConverterFactory(GsonConverterFactory.create())
            .build()
        api = retrofit.create(Api::class.java)
    }

    override fun onRequestPermissionsResult(requestCode: Int, permissions: Array<out String>, grantResults: IntArray) {
        super.onRequestPermissionsResult(requestCode, permissions, grantResults)
        if (ActivityCompat.checkSelfPermission(this, permission.ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            startListeningToData()
        }
    }

    @RequiresPermission(permission.ACCESS_FINE_LOCATION)
    private fun startListeningToData() {
        val locationProvider = LocationServices.getFusedLocationProviderClient(this)
        locationProvider.lastLocation.addOnSuccessListener { location -> lastLocation = location }
        locationProvider.requestLocationUpdates(LocationRequest.create().setPriority(LocationRequest.PRIORITY_HIGH_ACCURACY).setFastestInterval(1).setInterval(1).setMaxWaitTime(1), locationCallback, Looper.getMainLooper())

        val sensorManager = getSystemService(SENSOR_SERVICE) as SensorManager
        val pressureSensor = sensorManager.getDefaultSensor(Sensor.TYPE_PRESSURE)
        sensorManager.registerListener(pressureCallback, pressureSensor, TimeUnit.MINUTES.toMicros(1).toInt())
    }

    private val locationCallback = object : LocationCallback() {
        override fun onLocationResult(locationResult: LocationResult) {
            lastLocation = locationResult.lastLocation
        }
    }

    private val pressureCallback = object : SensorEventListener {
        override fun onSensorChanged(event: SensorEvent) {
            lastSensorData = event.values[0].toDouble()
        }

        override fun onAccuracyChanged(sensor: Sensor?, accuracy: Int) {
        }
    }

    private fun startDataSendLoop() {
        GlobalScope.launch {
            while (true) {
                delay(10000)
                if (lastLocation == null || lastSensorData == null) {
                    continue
                }
                val dataPoint = DataPoint(lastSensorData!!, lastLocation!!.latitude, lastLocation!!.longitude, System.currentTimeMillis() / 1000)
                displayData(dataPoint)
                api.postDataPoint(dataPoint)
                Log.e("SENT", "SENT")
            }
        }
    }

    private fun displayData(dataPoint: DataPoint) {
        if (isActive) {
            GlobalScope.launch(Dispatchers.Main) { textView.text = "Pressure: ${dataPoint.pressure}\nLocation: ${dataPoint.latitude}, ${dataPoint.longitude}" }
        }
    }

    override fun onPause() {
        super.onPause()
        isActive = false
    }

    override fun onResume() {
        super.onResume()
        isActive = true
    }
}
