package com.catmood.app.data.mock

import com.catmood.app.domain.analyzer.AnalysisError
import com.catmood.app.domain.model.EmotionState
import kotlin.math.abs
import kotlin.random.Random
import kotlinx.coroutines.test.runTest
import org.junit.Assert.assertEquals
import org.junit.Assert.assertTrue
import org.junit.Test

class MockPhotoAnalyzerTest {

    private val analyzer = MockPhotoAnalyzer(random = Random(seed = 42))

    @Test
    fun `successful results have normalized distributions`() = runTest {
        repeat(RUNS) {
            val result = analyzer.analyze("mock://photo")
            result.onSuccess { analysis ->
                val sum = analysis.distribution.values.sum()
                assertTrue("distribution sum was $sum", abs(sum - 1f) < EPSILON)
                assertEquals(
                    "distribution must cover all 5 states",
                    EmotionState.entries.toSet(),
                    analysis.distribution.keys,
                )
                analysis.distribution.values.forEach { p ->
                    assertTrue("probability $p out of range", p in 0f..1f)
                }
            }
        }
    }

    @Test
    fun `confidence and pain score stay in unit range`() = runTest {
        repeat(RUNS) {
            analyzer.analyze("mock://photo").onSuccess { analysis ->
                assertTrue(
                    "confidence ${analysis.confidence} out of range",
                    analysis.confidence in 0f..1f,
                )
                assertTrue(
                    "painScore ${analysis.painScore} out of range",
                    analysis.painScore in 0f..1f,
                )
            }
        }
    }

    @Test
    fun `successful results carry FGS cues`() = runTest {
        repeat(RUNS) {
            analyzer.analyze("mock://photo").onSuccess { analysis ->
                assertTrue("cues must not be empty", analysis.cues.isNotEmpty())
                analysis.cues.forEach { cue ->
                    assertTrue(
                        "unexpected cue $cue",
                        cue in MockPhotoAnalyzer.FGS_CUES,
                    )
                }
            }
        }
    }

    @Test
    fun `mock exercises both error and low-confidence states`() = runTest {
        var errors = 0
        var lowConfidence = 0
        repeat(RUNS) {
            val result = analyzer.analyze("mock://photo")
            result.onFailure { throwable ->
                assertTrue(
                    "failures must be typed AnalysisError",
                    throwable is AnalysisError,
                )
                errors++
            }
            result.onSuccess { analysis ->
                if (analysis.confidence < 0.55f) lowConfidence++
            }
        }
        assertTrue("expected some error outcomes", errors > 0)
        assertTrue("expected some low-confidence outcomes", lowConfidence > 0)
    }

    private companion object {
        const val RUNS = 200
        const val EPSILON = 1e-4f
    }
}
