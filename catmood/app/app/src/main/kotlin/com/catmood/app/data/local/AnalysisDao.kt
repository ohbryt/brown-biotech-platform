package com.catmood.app.data.local

import androidx.room.Dao
import androidx.room.Insert
import androidx.room.Query
import kotlinx.coroutines.flow.Flow

@Dao
interface AnalysisDao {
    @Insert
    suspend fun insert(entity: AnalysisResultEntity): Long

    @Query("SELECT * FROM analysis_results ORDER BY created_at DESC")
    fun observeAll(): Flow<List<AnalysisResultEntity>>

    @Query("SELECT * FROM analysis_results WHERE cat_id = :catId ORDER BY created_at DESC")
    fun observeForCat(catId: Long): Flow<List<AnalysisResultEntity>>
}
