package com.catmood.app.data.mock

import com.catmood.app.domain.analyzer.AnalysisError
import com.catmood.app.domain.analyzer.PhotoAnalyzer
import com.catmood.app.domain.model.EmotionState
import com.catmood.app.domain.model.PhotoAnalysis
import javax.inject.Inject
import kotlin.random.Random
import kotlinx.coroutines.delay

/**
 * Phase-0 mock. Produces plausible, normalized distributions plus occasional
 * low-confidence and error outcomes so every UI state is exercisable.
 * Replaced by a LiteRT implementation in Phase 1.
 */
class MockPhotoAnalyzer(
    private val random: Random,
) : PhotoAnalyzer {

    @Inject
    constructor() : this(Random.Default)

    override suspend fun analyze(imageUri: String): Result<PhotoAnalysis> {
        delay(random.nextLong(MIN_LATENCY_MS, MAX_LATENCY_MS + 1))

        val roll = random.nextFloat()
        if (roll < NO_CAT_RATE) return Result.failure(AnalysisError.NoCatDetected)
        if (roll < NO_CAT_RATE + MODEL_FAILURE_RATE) {
            return Result.failure(AnalysisError.ModelLoadFailure)
        }

        val distribution = randomDistribution()
        val painProbability = distribution.getValue(EmotionState.PAIN_DISCOMFORT)
        // Pain score loosely tracks the pain-state probability with some noise.
        val painScore = (painProbability * 0.7f + random.nextFloat() * 0.3f).coerceIn(0f, 1f)
        val confidence = if (random.nextFloat() < LOW_CONFIDENCE_RATE) {
            randomBetween(0.25f, 0.54f)
        } else {
            randomBetween(0.60f, 0.95f)
        }

        return Result.success(
            PhotoAnalysis(
                distribution = distribution,
                painScore = painScore,
                confidence = confidence,
                cues = randomCues(),
            ),
        )
    }

    private fun randomDistribution(): Map<EmotionState, Float> {
        val weights = EmotionState.entries.associateWith { random.nextFloat() + 0.05f }
        val total = weights.values.sum()
        return weights.mapValues { (_, w) -> w / total }
    }

    private fun randomCues(): List<String> {
        val count = random.nextInt(2, 4)
        return FGS_CUES.shuffled(random).take(count)
    }

    private fun randomBetween(min: Float, max: Float): Float =
        min + random.nextFloat() * (max - min)

    companion object {
        const val MIN_LATENCY_MS = 200L
        const val MAX_LATENCY_MS = 400L
        const val NO_CAT_RATE = 0.08f
        const val MODEL_FAILURE_RATE = 0.04f
        const val LOW_CONFIDENCE_RATE = 0.20f

        /** Feline Grimace Scale action units (Evangelista et al. 2019). */
        val FGS_CUES = listOf(
            "ear position rotated outward",
            "orbital tightening",
            "muzzle tension",
            "whiskers pushed forward",
            "head below shoulder line",
        )
    }
}
