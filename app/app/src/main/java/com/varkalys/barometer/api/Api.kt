package com.varkalys.barometer.api

import com.varkalys.barometer.api.entity.DataPoint
import retrofit2.http.Body
import retrofit2.http.POST

interface Api {

    @POST("data-points")
    suspend fun postDataPoint(@Body dataPoint: DataPoint)
}