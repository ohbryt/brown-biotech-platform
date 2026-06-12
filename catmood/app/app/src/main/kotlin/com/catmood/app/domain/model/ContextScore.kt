package com.catmood.app.domain.model

data class ContextScore(
    val context: MeowContext,
    val probability: Float,
)
