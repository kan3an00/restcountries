<template>
    <div class="fixed top-0 p-6 px-4 lg:px-14 bg-white shadow-lg dark:bg-header-dark w-full z-50">
        <div class="flex justify-between items-center">
            <div>
                <h1 class="dark:text-white text-black font-semibold text-xl">Where in the world?</h1>
            </div>
            <div class="flex justify-center items-center gap-2" @click="darkModeToggle">
                <MoonIcon v-if="dark" class="h-5 w-5 dark:text-white text-black cursor-pointer" />
                <MoonIconOultine v-else class="h-5 w-5 dark:text-white text-black cursor-pointer" />
                <p class="dark:text-white text-black cursor-pointer">Dark Mode</p>
            </div>
        </div>
    </div>
</template>
<script>
    import { MoonIcon } from '@heroicons/vue/solid'
    import { MoonIcon as MoonIconOultine }  from '@heroicons/vue/outline'
    import $ from 'jquery'
    export default {
        data() {
            return {
                dark: false,
            }
        },
        components:{
            MoonIcon,
            MoonIconOultine
        },
        mounted(){
            this.dark = $("html").hasClass("dark");
        },
        methods:{
            darkModeToggle(){
                if(this.dark == false){
                    $("html").addClass("dark")
                    this.dark = true;
                }else{
                    $("html").removeClass("dark")
                    this.dark = false;
                }
            }
        }
    }
</script>