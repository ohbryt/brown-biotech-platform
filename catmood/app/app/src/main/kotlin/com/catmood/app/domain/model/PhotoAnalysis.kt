package com.catmood.app.domain.model

/**
 * Result of one photo inference. Always a full distribution + confidence —
 * never a single certain verdict.
 *
 * @param distribution probability per [EmotionState]; values sum to 1.0.
 * @param painScore FGS-grounded pain/discomfort indicator in [0, 1]. Not a diagnosis.
 * @param confidence overall model confidence in [0, 1].
 * @param cues human-readable visible cues (FGS action units, e.g. "orbital tightening").
 */
data class PhotoAnalysis(
    val distribution: Map<EmotionState, Float>,
    val painScore: Float,
    val confidence: Float,
    val cues: List<String>,
)
