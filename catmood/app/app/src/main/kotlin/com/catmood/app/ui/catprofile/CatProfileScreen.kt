package com.catmood.app.ui.catprofile

import androidx.compose.foundation.layout.Arrangement
import androidx.compose.foundation.layout.Column
import androidx.compose.foundation.layout.Row
import androidx.compose.foundation.layout.defaultMinSize
import androidx.compose.foundation.layout.fillMaxSize
import androidx.compose.foundation.layout.fillMaxWidth
import androidx.compose.foundation.layout.padding
import androidx.compose.foundation.lazy.LazyColumn
import androidx.compose.foundation.lazy.items
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.automirrored.filled.ArrowBack
import androidx.compose.material.icons.filled.Delete
import androidx.compose.material3.Button
import androidx.compose.material3.Card
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.ExperimentalMaterial3Api
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.OutlinedTextField
import androidx.compose.material3.Scaffold
import androidx.compose.material3.Text
import androidx.compose.material3.TopAppBar
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.mutableStateOf
import androidx.compose.runtime.saveable.rememberSaveable
import androidx.compose.runtime.setValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.res.stringResource
import androidx.hilt.navigation.compose.hiltViewModel
import androidx.lifecycle.compose.collectAsStateWithLifecycle
import com.catmood.app.R
import com.catmood.app.domain.model.CatProfile
import com.catmood.core.designsystem.theme.CatMoodSpacing

@OptIn(ExperimentalMaterial3Api::class)
@Composable
fun CatProfileScreen(
    onBack: () -> Unit,
    viewModel: CatProfileViewModel = hiltViewModel(),
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()
    var name by rememberSaveable { mutableStateOf("") }
    var breed by rememberSaveable { mutableStateOf("") }

    Scaffold(
        topBar = {
            TopAppBar(
                title = { Text(stringResource(R.string.profile_title)) },
                navigationIcon = {
                    IconButton(onClick = onBack) {
                        Icon(
                            Icons.AutoMirrored.Filled.ArrowBack,
                            contentDescription = stringResource(R.string.action_back),
                        )
                    }
                },
            )
        },
    ) { padding ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(padding)
                .padding(CatMoodSpacing.md),
            verticalArrangement = Arrangement.spacedBy(CatMoodSpacing.md),
        ) {
            OutlinedTextField(
                value = name,
                onValueChange = { name = it },
                label = { Text(stringResource(R.string.profile_name_label)) },
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
            )
            OutlinedTextField(
                value = breed,
                onValueChange = { breed = it },
                label = { Text(stringResource(R.string.profile_breed_label)) },
                singleLine = true,
                modifier = Modifier.fillMaxWidth(),
            )
            Button(
                onClick = {
                    viewModel.saveProfile(name = name, breed = breed)
                    name = ""
                    breed = ""
                },
                enabled = name.isNotBlank(),
                modifier = Modifier.defaultMinSize(minHeight = CatMoodSpacing.minTouchTarget),
            ) {
                Text(stringResource(R.string.profile_add))
            }

            when (val state = uiState) {
                CatProfileUiState.Loading -> CircularProgressIndicator(
                    modifier = Modifier.align(Alignment.CenterHorizontally),
                )

                CatProfileUiState.Empty -> Text(
                    text = stringResource(R.string.profile_empty),
                    style = MaterialTheme.typography.bodyMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant,
                )

                is CatProfileUiState.Content -> LazyColumn(
                    verticalArrangement = Arrangement.spacedBy(CatMoodSpacing.sm),
                ) {
                    items(state.profiles, key = { it.id }) { profile ->
                        ProfileCard(
                            profile = profile,
                            onDelete = { viewModel.deleteProfile(profile.id) },
                        )
                    }
                }
            }
        }
    }
}

@Composable
private fun ProfileCard(
    profile: CatProfile,
    onDelete: () -> Unit,
) {
    Card(modifier = Modifier.fillMaxWidth()) {
        Row(
            modifier = Modifier
                .fillMaxWidth()
                .padding(CatMoodSpacing.md),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically,
        ) {
            Column {
                Text(text = profile.name, style = MaterialTheme.typography.titleMedium)
                profile.breed?.let {
                    Text(
                        text = it,
                        style = MaterialTheme.typography.bodyMedium,
                        color = MaterialTheme.colorScheme.onSurfaceVariant,
                    )
                }
            }
            IconButton(onClick = onDelete) {
                Icon(
                    Icons.Filled.Delete,
                    contentDescription = stringResource(
                        R.string.cd_delete_profile,
                        profile.name,
                    ),
                )
            }
        }
    }
}
