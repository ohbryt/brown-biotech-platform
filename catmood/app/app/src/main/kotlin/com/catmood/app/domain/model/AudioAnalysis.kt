package com.catmood.app.domain.model

/**
 * Result of one meow-context inference.
 *
 * @param topContexts top contexts by probability, descending (at most 3).
 * @param confidence overall model confidence in [0, 1].
 * @param isUncertain reject option: true when the model could not tell.
 *        UI must show an explicit "couldn't tell" state, never a forced verdict.
 */
data class AudioAnalysis(
    val topContexts: List<ContextScore>,
    val confidence: Float,
    val isUncertain: Boolean,
)
