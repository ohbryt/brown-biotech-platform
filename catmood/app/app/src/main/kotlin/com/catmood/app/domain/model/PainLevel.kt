package com.catmood.app.domain.model

/**
 * Discrete pain/discomfort indicator level derived from the FGS-grounded
 * pain score. Thresholds are Phase-0 placeholders; they are calibrated
 * against labeled data in Phase 1.
 */
enum class PainLevel {
    LOW,
    MODERATE,
    HIGH;

    companion object {
        const val MODERATE_THRESHOLD = 0.34f
        const val HIGH_THRESHOLD = 0.67f

        fun fromScore(score: Float): PainLevel = when {
            score >= HIGH_THRESHOLD -> HIGH
            score >= MODERATE_THRESHOLD -> MODERATE
            else -> LOW
        }
    }
}
