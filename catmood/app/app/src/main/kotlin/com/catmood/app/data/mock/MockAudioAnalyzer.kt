package com.catmood.app.data.mock

import com.catmood.app.domain.analyzer.AnalysisError
import com.catmood.app.domain.analyzer.AudioAnalyzer
import com.catmood.app.domain.model.AudioAnalysis
import com.catmood.app.domain.model.ContextScore
import com.catmood.app.domain.model.MeowContext
import javax.inject.Inject
import kotlin.random.Random
import kotlinx.coroutines.delay

/**
 * Phase-0 mock. Produces normalized context scores, an explicit uncertain
 * (reject) state and occasional errors so every UI state is exercisable.
 * Replaced by a LiteRT implementation in Phase 2.
 */
class MockAudioAnalyzer(
    private val random: Random,
) : AudioAnalyzer {

    @Inject
    constructor() : this(Random.Default)

    override suspend fun analyze(pcmPath: String): Result<AudioAnalysis> {
        delay(random.nextLong(MIN_LATENCY_MS, MAX_LATENCY_MS + 1))

        val roll = random.nextFloat()
        if (roll < TOO_NOISY_RATE) return Result.failure(AnalysisError.TooNoisy)
        if (roll < TOO_NOISY_RATE + MODEL_FAILURE_RATE) {
            return Result.failure(AnalysisError.ModelLoadFailure)
        }

        // Real classes only; UNCERTAIN is a reject decision, not a scored class.
        val weights = CLASSIFIABLE_CONTEXTS.associateWith { random.nextFloat() + 0.05f }
        val total = weights.values.sum()
        val scores = weights
            .map { (context, w) -> ContextScore(context, w / total) }
            .sortedByDescending { it.probability }
            .take(3)

        val uncertain = random.nextFloat() < UNCERTAIN_RATE
        val confidence = if (uncertain) {
            randomBetween(0.15f, 0.45f)
        } else {
            randomBetween(0.55f, 0.92f)
        }

        return Result.success(
            AudioAnalysis(
                topContexts = scores,
                confidence = confidence,
                isUncertain = uncertain,
            ),
        )
    }

    private fun randomBetween(min: Float, max: Float): Float =
        min + random.nextFloat() * (max - min)

    companion object {
        const val MIN_LATENCY_MS = 200L
        const val MAX_LATENCY_MS = 400L
        const val TOO_NOISY_RATE = 0.08f
        const val MODEL_FAILURE_RATE = 0.04f
        const val UNCERTAIN_RATE = 0.18f

        val CLASSIFIABLE_CONTEXTS = listOf(
            MeowContext.FOOD_REQUEST,
            MeowContext.ATTENTION_ISOLATION,
            MeowContext.HANDLING_CONTACT,
        )
    }
}
