package com.catmood.app.domain.model

data class CatProfile(
    val id: Long = 0L,
    val name: String,
    val breed: String? = null,
    val photoUri: String? = null,
)
