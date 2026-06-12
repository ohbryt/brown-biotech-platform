package com.catmood.app.domain.analyzer

import com.catmood.app.domain.model.PhotoAnalysis

/**
 * Photo -> emotion-state inference boundary.
 * Phase 0 binds a mock; a LiteRT implementation replaces the Hilt binding in Phase 1.
 * Failures are [AnalysisError] instances inside the failed [Result].
 */
interface PhotoAnalyzer {
    suspend fun analyze(imageUri: String): Result<PhotoAnalysis>
}
