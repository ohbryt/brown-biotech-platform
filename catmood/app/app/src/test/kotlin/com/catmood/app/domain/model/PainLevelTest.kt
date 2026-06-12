package com.catmood.app.domain.model

import org.junit.Assert.assertEquals
import org.junit.Test

class PainLevelTest {

    @Test
    fun `scores below moderate threshold map to LOW`() {
        assertEquals(PainLevel.LOW, PainLevel.fromScore(0f))
        assertEquals(PainLevel.LOW, PainLevel.fromScore(0.1f))
        assertEquals(PainLevel.LOW, PainLevel.fromScore(0.33f))
    }

    @Test
    fun `scores between thresholds map to MODERATE`() {
        assertEquals(PainLevel.MODERATE, PainLevel.fromScore(PainLevel.MODERATE_THRESHOLD))
        assertEquals(PainLevel.MODERATE, PainLevel.fromScore(0.5f))
        assertEquals(PainLevel.MODERATE, PainLevel.fromScore(0.66f))
    }

    @Test
    fun `scores at or above high threshold map to HIGH`() {
        assertEquals(PainLevel.HIGH, PainLevel.fromScore(PainLevel.HIGH_THRESHOLD))
        assertEquals(PainLevel.HIGH, PainLevel.fromScore(0.8f))
        assertEquals(PainLevel.HIGH, PainLevel.fromScore(1f))
    }
}
