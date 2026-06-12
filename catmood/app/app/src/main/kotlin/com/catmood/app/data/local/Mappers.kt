package com.catmood.app.data.local

import com.catmood.app.domain.model.AnalysisRecord
import com.catmood.app.domain.model.AnalysisType
import com.catmood.app.domain.model.AudioAnalysis
import com.catmood.app.domain.model.CatProfile
import com.catmood.app.domain.model.ContextScore
import com.catmood.app.domain.model.EmotionState
import com.catmood.app.domain.model.MeowContext
import com.catmood.app.domain.model.PhotoAnalysis

/**
 * Entity <-> domain mappers. Distributions are stored as compact
 * "KEY:prob;KEY:prob" strings to keep Phase 0 free of a JSON dependency.
 */
object Mappers {

    private const val PAIR_SEPARATOR = ";"
    private const val KEY_VALUE_SEPARATOR = ":"
    private const val LIST_SEPARATOR = "|"

    // --- AnalysisRecord ---

    fun AnalysisRecord.toEntity(): AnalysisResultEntity = AnalysisResultEntity(
        id = id,
        catId = catId,
        type = type.name,
        confidence = confidence,
        painScore = painScore,
        createdAt = createdAt,
        distribution = photo?.distribution?.encodeDistribution(),
        cues = photo?.cues?.joinToString(LIST_SEPARATOR),
        topContexts = audio?.topContexts?.encodeContextScores(),
        isUncertain = audio?.isUncertain,
    )

    fun AnalysisResultEntity.toDomain(): AnalysisRecord {
        val analysisType = AnalysisType.valueOf(type)
        return AnalysisRecord(
            id = id,
            catId = catId,
            type = analysisType,
            confidence = confidence,
            painScore = painScore,
            createdAt = createdAt,
            photo = if (analysisType == AnalysisType.PHOTO) {
                PhotoAnalysis(
                    distribution = distribution?.decodeDistribution().orEmpty(),
                    painScore = painScore ?: 0f,
                    confidence = confidence,
                    cues = cues?.takeIf { it.isNotEmpty() }
                        ?.split(LIST_SEPARATOR)
                        .orEmpty(),
                )
            } else {
                null
            },
            audio = if (analysisType == AnalysisType.AUDIO) {
                AudioAnalysis(
                    topContexts = topContexts?.decodeContextScores().orEmpty(),
                    confidence = confidence,
                    isUncertain = isUncertain ?: false,
                )
            } else {
                null
            },
        )
    }

    // --- CatProfile ---

    fun CatProfile.toEntity(): CatProfileEntity = CatProfileEntity(
        id = id,
        name = name,
        breed = breed,
        photoUri = photoUri,
    )

    fun CatProfileEntity.toDomain(): CatProfile = CatProfile(
        id = id,
        name = name,
        breed = breed,
        photoUri = photoUri,
    )

    // --- Encoding helpers ---

    fun Map<EmotionState, Float>.encodeDistribution(): String =
        entries.joinToString(PAIR_SEPARATOR) { (state, prob) ->
            "${state.name}$KEY_VALUE_SEPARATOR$prob"
        }

    fun String.decodeDistribution(): Map<EmotionState, Float> =
        splitPairs().associate { (key, value) ->
            EmotionState.valueOf(key) to value
        }

    fun List<ContextScore>.encodeContextScores(): String =
        joinToString(PAIR_SEPARATOR) { score ->
            "${score.context.name}$KEY_VALUE_SEPARATOR${score.probability}"
        }

    fun String.decodeContextScores(): List<ContextScore> =
        splitPairs().map { (key, value) ->
            ContextScore(MeowContext.valueOf(key), value)
        }

    private fun String.splitPairs(): List<Pair<String, Float>> =
        split(PAIR_SEPARATOR)
            .filter { it.isNotBlank() }
            .map { pair ->
                val (key, value) = pair.split(KEY_VALUE_SEPARATOR, limit = 2)
                key to value.toFloat()
            }
}
