<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> |
            <router-link to="/about">About</router-link>
        </div>
        <v-app>
            <v-content>
                <v-container fluid>
                    <router-view/>
                </v-container>
            </v-content>
        </v-app>
    </div>
</template>
