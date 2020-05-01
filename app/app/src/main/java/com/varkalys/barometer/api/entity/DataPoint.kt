package com.varkalys.barometer.api.entity

data class DataPoint(
    val pressure: Double,
    val latitude: Double,
    val longitude: Double,
    val timestamp: Long
)