package com.catmood.app.data.local

import androidx.room.Dao
import androidx.room.Query
import androidx.room.Upsert
import kotlinx.coroutines.flow.Flow

@Dao
interface CatProfileDao {
    @Upsert
    suspend fun upsert(entity: CatProfileEntity): Long

    @Query("SELECT * FROM cat_profiles WHERE id = :id")
    suspend fun getById(id: Long): CatProfileEntity?

    @Query("SELECT * FROM cat_profiles ORDER BY name ASC")
    fun observeAll(): Flow<List<CatProfileEntity>>

    @Query("DELETE FROM cat_profiles WHERE id = :id")
    suspend fun deleteById(id: Long)
}
