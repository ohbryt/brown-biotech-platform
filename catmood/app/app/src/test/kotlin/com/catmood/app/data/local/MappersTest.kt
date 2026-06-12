package com.catmood.app.data.local

import com.catmood.app.data.local.Mappers.toDomain
import com.catmood.app.data.local.Mappers.toEntity
import com.catmood.app.domain.model.AnalysisRecord
import com.catmood.app.domain.model.AnalysisType
import com.catmood.app.domain.model.AudioAnalysis
import com.catmood.app.domain.model.CatProfile
import com.catmood.app.domain.model.ContextScore
import com.catmood.app.domain.model.EmotionState
import com.catmood.app.domain.model.MeowContext
import com.catmood.app.domain.model.PhotoAnalysis
import org.junit.Assert.assertEquals
import org.junit.Assert.assertNull
import org.junit.Test

class MappersTest {

    private val photoAnalysis = PhotoAnalysis(
        distribution = mapOf(
            EmotionState.RELAXED_CONTENT to 0.4f,
            EmotionState.ALERT_AROUSED to 0.3f,
            EmotionState.FEARFUL_ANXIOUS to 0.15f,
            EmotionState.IRRITATED_AGGRESSIVE to 0.1f,
            EmotionState.PAIN_DISCOMFORT to 0.05f,
        ),
        painScore = 0.2f,
        confidence = 0.8f,
        cues = listOf("orbital tightening", "muzzle tension"),
    )

    private val audioAnalysis = AudioAnalysis(
        topContexts = listOf(
            ContextScore(MeowContext.FOOD_REQUEST, 0.64f),
            ContextScore(MeowContext.ATTENTION_ISOLATION, 0.24f),
            ContextScore(MeowContext.HANDLING_CONTACT, 0.12f),
        ),
        confidence = 0.7f,
        isUncertain = false,
    )

    @Test
    fun `photo record roundtrips through entity`() {
        val record = AnalysisRecord(
            id = 3L,
            catId = 11L,
            type = AnalysisType.PHOTO,
            confidence = photoAnalysis.confidence,
            painScore = photoAnalysis.painScore,
            createdAt = 1_700_000_000_000L,
            photo = photoAnalysis,
        )

        val roundtripped = record.toEntity().toDomain()

        assertEquals(record, roundtripped)
        assertNull(roundtripped.audio)
    }

    @Test
    fun `audio record roundtrips through entity`() {
        val record = AnalysisRecord(
            id = 4L,
            catId = null,
            type = AnalysisType.AUDIO,
            confidence = audioAnalysis.confidence,
            painScore = null,
            createdAt = 1_700_000_500_000L,
            audio = audioAnalysis,
        )

        val roundtripped = record.toEntity().toDomain()

        assertEquals(record, roundtripped)
        assertNull(roundtripped.photo)
    }

    @Test
    fun `photo entity columns are populated and audio columns are null`() {
        val record = AnalysisRecord(
            type = AnalysisType.PHOTO,
            confidence = photoAnalysis.confidence,
            painScore = photoAnalysis.painScore,
            createdAt = 1L,
            photo = photoAnalysis,
        )

        val entity = record.toEntity()

        assertEquals("PHOTO", entity.type)
        assertEquals("orbital tightening|muzzle tension", entity.cues)
        assertNull(entity.topContexts)
        assertNull(entity.isUncertain)
    }

    @Test
    fun `cat profile roundtrips through entity`() {
        val profile = CatProfile(id = 1L, name = "Mochi", breed = null, photoUri = null)
        assertEquals(profile, profile.toEntity().toDomain())

        val full = CatProfile(id = 2L, name = "Bori", breed = "Korean Shorthair", photoUri = "file://x")
        assertEquals(full, full.toEntity().toDomain())
    }
}
