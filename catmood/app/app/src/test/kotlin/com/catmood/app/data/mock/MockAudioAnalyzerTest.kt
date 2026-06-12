package com.catmood.app.data.mock

import com.catmood.app.domain.analyzer.AnalysisError
import com.catmood.app.domain.model.MeowContext
import kotlin.random.Random
import kotlinx.coroutines.test.runTest
import org.junit.Assert.assertTrue
import org.junit.Test

class MockAudioAnalyzerTest {

    private val analyzer = MockAudioAnalyzer(random = Random(seed = 7))

    @Test
    fun `top contexts are valid, sorted and at most three`() = runTest {
        repeat(RUNS) {
            analyzer.analyze("mock://audio.pcm").onSuccess { analysis ->
                assertTrue("expected 1..3 contexts", analysis.topContexts.size in 1..3)
                analysis.topContexts.forEach { score ->
                    assertTrue(
                        "probability ${score.probability} out of range",
                        score.probability in 0f..1f,
                    )
                    assertTrue(
                        "UNCERTAIN must not be a scored class",
                        score.context != MeowContext.UNCERTAIN,
                    )
                }
                val sorted = analysis.topContexts.sortedByDescending { it.probability }
                assertTrue("contexts must be sorted descending", sorted == analysis.topContexts)
            }
        }
    }

    @Test
    fun `probabilities of full ranking sum to one`() = runTest {
        repeat(RUNS) {
            analyzer.analyze("mock://audio.pcm").onSuccess { analysis ->
                // Mock returns all 3 classifiable contexts, so the sum must be ~1.
                val sum = analysis.topContexts.sumOf { it.probability.toDouble() }
                assertTrue("sum was $sum", kotlin.math.abs(sum - 1.0) < EPSILON)
            }
        }
    }

    @Test
    fun `confidence stays in unit range`() = runTest {
        repeat(RUNS) {
            analyzer.analyze("mock://audio.pcm").onSuccess { analysis ->
                assertTrue(
                    "confidence ${analysis.confidence} out of range",
                    analysis.confidence in 0f..1f,
                )
            }
        }
    }

    @Test
    fun `mock exercises uncertain and error states`() = runTest {
        var uncertain = 0
        var errors = 0
        repeat(RUNS) {
            val result = analyzer.analyze("mock://audio.pcm")
            result.onSuccess { if (it.isUncertain) uncertain++ }
            result.onFailure { throwable ->
                assertTrue(
                    "failures must be typed AnalysisError",
                    throwable is AnalysisError,
                )
                errors++
            }
        }
        assertTrue("expected some uncertain outcomes", uncertain > 0)
        assertTrue("expected some error outcomes", errors > 0)
    }

    private companion object {
        const val RUNS = 200
        const val EPSILON = 1e-4
    }
}
