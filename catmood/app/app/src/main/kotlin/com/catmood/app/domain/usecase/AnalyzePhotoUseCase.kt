package com.catmood.app.domain.usecase

import com.catmood.app.domain.analyzer.PhotoAnalyzer
import com.catmood.app.domain.model.PhotoAnalysis
import javax.inject.Inject

/**
 * Runs photo inference through the bound [PhotoAnalyzer].
 * Thin wrapper so the UI layer never depends on analyzer bindings directly.
 */
class AnalyzePhotoUseCase @Inject constructor(
    private val photoAnalyzer: PhotoAnalyzer,
) {
    suspend operator fun invoke(imageUri: String): Result<PhotoAnalysis> =
        photoAnalyzer.analyze(imageUri)
}
