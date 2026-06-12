package com.catmood.app.domain.analyzer

import com.catmood.app.domain.model.AudioAnalysis

/**
 * Meow recording -> context inference boundary.
 * Phase 0 binds a mock; a LiteRT implementation replaces the Hilt binding in Phase 2.
 * Failures are [AnalysisError] instances inside the failed [Result].
 */
interface AudioAnalyzer {
    suspend fun analyze(pcmPath: String): Result<AudioAnalysis>
}
