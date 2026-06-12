package com.catmood.app.data.local

import androidx.room.ColumnInfo
import androidx.room.Entity
import androidx.room.PrimaryKey

@Entity(tableName = "analysis_results")
data class AnalysisResultEntity(
    @PrimaryKey(autoGenerate = true) val id: Long = 0L,
    @ColumnInfo(name = "cat_id") val catId: Long?,
    /** "PHOTO" or "AUDIO" — see [com.catmood.app.domain.model.AnalysisType]. */
    @ColumnInfo(name = "type") val type: String,
    @ColumnInfo(name = "confidence") val confidence: Float,
    @ColumnInfo(name = "pain_score") val painScore: Float?,
    @ColumnInfo(name = "created_at") val createdAt: Long,
    /** PHOTO only: "STATE:prob;STATE:prob;..." (see Mappers). */
    @ColumnInfo(name = "distribution") val distribution: String?,
    /** PHOTO only: cues joined with '|'. */
    @ColumnInfo(name = "cues") val cues: String?,
    /** AUDIO only: "CONTEXT:prob;CONTEXT:prob;..." descending. */
    @ColumnInfo(name = "top_contexts") val topContexts: String?,
    /** AUDIO only. */
    @ColumnInfo(name = "is_uncertain") val isUncertain: Boolean?,
)
