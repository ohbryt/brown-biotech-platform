package com.catmood.app.domain.usecase

import com.catmood.app.domain.analyzer.AudioAnalyzer
import com.catmood.app.domain.model.AudioAnalysis
import javax.inject.Inject

/**
 * Runs meow-context inference through the bound [AudioAnalyzer].
 * Thin wrapper so the UI layer never depends on analyzer bindings directly.
 */
class AnalyzeAudioUseCase @Inject constructor(
    private val audioAnalyzer: AudioAnalyzer,
) {
    suspend operator fun invoke(pcmPath: String): Result<AudioAnalysis> =
        audioAnalyzer.analyze(pcmPath)
}
