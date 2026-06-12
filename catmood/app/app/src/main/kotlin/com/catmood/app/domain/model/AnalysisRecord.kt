package com.catmood.app.domain.model

enum class AnalysisType { PHOTO, AUDIO }

/**
 * One saved observation, attached to an optional cat profile.
 * Exactly one of [photo] / [audio] is non-null, matching [type].
 */
data class AnalysisRecord(
    val id: Long = 0L,
    val catId: Long? = null,
    val type: AnalysisType,
    val confidence: Float,
    val painScore: Float? = null,
    val createdAt: Long,
    val photo: PhotoAnalysis? = null,
    val audio: AudioAnalysis? = null,
)
