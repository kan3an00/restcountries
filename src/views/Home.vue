<script setup>
    import {
        Listbox,
        ListboxLabel,
        ListboxButton,
        ListboxOptions,
        ListboxOption,
    } from '@headlessui/vue'
    import { CheckIcon, SelectorIcon, ChevronDownIcon } from '@heroicons/vue/solid'
</script>
<template>
    <div v-if="mount">
        <Header />
        <main class="lg:mx-32 mx-4 mt-32">
            <!-- Top Section -->
            <div class="grid lg:grid-cols-2 grid-cols-1 gap-y-10 justify-between items-center">
                <div class="dark:bg-header-dark bg-white flex px-8 gap-6 py-3 rounded-md items-center w-full lg:w-7/12 shadow-md">
                    <SearchIcon class="h-5 w-5 dark:text-white text-gray-500" />
                    <input v-model="searchInput" @keyup="search" type="text" class="bg-transparent focus:outline-none dark:text-white text-black placeholder:text-gray-400 placeholder:text-sm w-full" placeholder="Search for a country...">
                </div>
                <div class="flex items-center lg:justify-end ">
                    <Listbox v-model="selectedRegion">
                        <div class="relative mt-1">
                            <ListboxButton
                                class="relative w-full py-3 pl-6 pr-10 text-left dark:bg-header-dark bg-white rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm"
                                >
                                <span class="block truncate dark:text-gray-200 texy-black">{{ selectedRegion.name }}</span>
                                <span
                                    class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none"
                                >
                                    <ChevronDownIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
                                </span>
                            </ListboxButton>

                            <transition
                            leave-active-class="transition duration-100 ease-in"
                            leave-from-class="opacity-100"
                            leave-to-class="opacity-0"
                            >
                            <ListboxOptions
                                class="absolute w-full py-1 mt-1 overflow-auto text-base dark:bg-header-dark bg-white rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                            >
                                <ListboxOption
                                v-slot="{ active, selected }"
                                v-for="region in regions"
                                :key="region.name"
                                :value="region"
                                as="template"
                                >
                                <li
                                    :class="[
                                    active ? 'dark:bg-body-dark bg-gray-200' : 'text-gray-900',
                                    'cursor-default select-none relative py-2 pr-4 pl-6',
                                    ]"
                                >
                                    <span :class="[selected ? 'font-medium dark:text-white text-black' : 'font-normal','block truncate','dark:text-white text-black']">{{ region.name }}</span>
                                </li>
                                </ListboxOption>
                            </ListboxOptions>
                            </transition>
                        </div>
                    </Listbox>
                </div>
            </div>

            <!-- Flags Section -->
            <div class="grid grid-cols-1 lg:grid-cols-4 gap-14 py-10">
                <div v-for="(country, index) in countries" :key="index" class="rounded-md dark:bg-header-dark bg-white shadow-lg overflow-hidden cursor-pointer pb-6" @click="this.$router.push(`/details?country=${country.name}`)">
                    <div class="flex flex-col">
                        <div class="h-40 bg-cover bg-no-repeat bg-center" :style="`background-image: url(${country.flag})`"></div>
                        <div class="p-5 px-6 flex flex-col gap-1">
                            <h3 class="font-bold dark:text-white text-black">{{country.name}}</h3>
                            <p class="mt-4 dark:text-white text-black text-sm font-semibold">Population: <span class=" dark:text-gray-300 text-black font-medium">{{country.population}}</span></p>
                            <p class="dark:text-white text-black text-sm font-semibold">Region: <span class="dark:text-gray-300 text-black font-medium">{{country.region}}</span></p>
                            <p class="dark:text-white text-black text-sm font-semibold">Capital: <span class="dark:text-gray-300 text-black font-medium">{{country.capital}}</span></p>
                        </div>
                    </div> 
                </div>
            </div>
        </main>
    </div>
</template>
<script>
    import Header from '../components/Header.vue'
    import { SearchIcon } from '@heroicons/vue/solid'
    import axios from 'axios'
    export default {
        data() {
            return {
                countries: [],
                searchInput: null,
                mount:false,
                regions: [
                    { name: 'Filter by Region' },
                    { name: 'Africa' },
                    { name: 'America' },
                    { name: 'Asia' },
                    { name: 'Europe' },
                    { name: 'Oceania' },
                ],
                selectedRegion: null
            }
        },
        components:{
            Header,
            SearchIcon
        },
        mounted() {
            this.selectedRegion = this.regions[0]
            var config = {
                method: 'get',
                url: 'https://restcountries.com/v2/all',
                headers: {
                    Accept: 'application/json'
                }
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
        watch: {
            selectedRegion: {
                handler: 'regionFilter',
                deep: true
            }
        },
        methods:{
            search(){
                var trimmed = this.searchInput.trim();
                if(trimmed.length > 0){
                    var config = {
                        method: 'get',
                        url: `https://restcountries.com/v2/name/${this.searchInput}`,
                        headers: { }
                    };

                    axios(config)
                        .then(response => {
                            this.countries = response.data;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            },
            regionFilter(){
                if(this.selectedRegion.name != this.regions[0].name)
                {
                    var config = {
                        method: 'get',
                        url: `https://restcountries.com/v2/continent/${this.selectedRegion.name}`,
                        headers: { }
                    };

                    axios(config)
                        .then(response => {
                            this.countries = response.data;
                        })
                        .catch(function (error) {
                            console.log(error);
                        });
                }
            }
        }
    }
</script>