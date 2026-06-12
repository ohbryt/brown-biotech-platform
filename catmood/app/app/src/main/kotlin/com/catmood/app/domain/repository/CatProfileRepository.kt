package com.catmood.app.domain.repository

import com.catmood.app.domain.model.CatProfile
import kotlinx.coroutines.flow.Flow

interface CatProfileRepository {
    fun observeProfiles(): Flow<List<CatProfile>>
    suspend fun getProfile(id: Long): CatProfile?
    suspend fun upsert(profile: CatProfile): Long
    suspend fun delete(id: Long)
}
