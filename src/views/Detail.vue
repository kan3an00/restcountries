<template>
    <div v-if="mount">
        <Header />
        <main class="lg:mt-40 mt-28 lg:mx-32 mx-4 pb-10">
            <div class="flex">
                <div class="shadow-3xl-dark dark:bg-header-dark flex py-[0.35rem] px-6 items-center justify-center gap-4 rounded-lg cursor-pointer dark:text-gray-200 text-black" @click="this.$router.push('/')">
                    <ArrowNarrowLeftIcon class="h-5 w-5" />
                    <p>Back</p>
                </div>
            </div>
            <div class="mt-14 grid grid-cols-1 lg:grid-cols-2 gap-x-28">
                <img :src="countries[0].flag" class="w-full" alt="">
                <div class="flex flex-col justify-center gap-2">
                    <h1 class="dark:text-white text-black text-2xl font-bold">{{countries[0].name}}</h1>
                    <div class="grid lg:grid-cols-2 grid-cols-1 gap-y-10">
                        <div>
                            <p class="mt-4 dark:text-white text-black text-sm font-semibold">Native Name: <span class="font-medium" v-if="countries[0].nativeName != undefined">{{countries[0].nativeName}}</span></p>
                            <p class="mt-4 dark:text-white text-black text-sm font-semibold">Population: <span class="font-medium" v-if="countries[0].population != undefined">{{countries[0].population}}</span></p>
                            <p class="mt-4 dark:text-white text-black text-sm font-semibold">Region: <span class="font-medium" v-if="countries[0].region != undefined">{{countries[0].region}}</span></p>
                            <p class="mt-4 dark:text-white text-black text-sm font-semibold">Sub Region: <span class="font-medium" v-if="countries[0].subregion != undefined">{{countries[0].subregion}}</span></p>
                            <p class="mt-4 dark:text-white text-black text-sm font-semibold">Capital: <span class="font-medium" v-if="countries[0].capital != undefined">{{countries[0].capital}}</span></p>
                        </div>
                        <div>
                            <p class="mt-4 dark:text-white text-black text-sm font-semibold">Top Level Domain: <span class="font-medium" v-if="countries[0].topLevelDomain != undefined">{{countries[0].topLevelDomain[0]}}</span></p>
                            <p class="mt-4 dark:text-white text-black text-sm font-semibold">Currencies: <span class="font-medium" v-if="countries[0].currencies != undefined">{{countries[0].currencies[0].code}}</span></p>
                            <p class="mt-4 dark:text-white text-black text-sm font-semibold">Languages: 
                                <span class="font-medium" v-for="(lang, index) in countries[0].languages" :key="index">{{lang.nativeName}}, </span>
                            </p>
                        </div>
                        <div class="lg:col-span-2 mt-4 flex items-center gap-2">
                            <h3 class="dark:text-white text-black text-sm font-semibold">Border Countries:</h3>
                            <div class="flex flex-wrap gap-2">
                                <div v-for="(border, index) in countries[0].borders" :key="index" class="px-4 py-1 text-center text-xs font-semibold shadow-3xl bg-white dark:bg-header-dark rounded-md dark:text-white">{{border}}</div>
                            </div>
                        </div>
                    </div>
                </div> 
            </div>
        </main>
    </div>
</template>
<script>
    import Header from '../components/Header.vue'
    import { ArrowNarrowLeftIcon } from '@heroicons/vue/solid'
    import axios from 'axios'
    export default {
        data() {
            return {
                mount: false
            }
        },
        components:{
            Header,
            ArrowNarrowLeftIcon
        },
        mounted() {
            var config = {
                method: 'get',
                url: `https://restcountries.com/v2/name/${this.$route.query.country}`,
                headers: { }
            };

            axios(config)
                .then(response => {
                    this.countries = response.data;
                    this.mount = true;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
    }
</script>