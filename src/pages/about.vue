<template>
	<div class="b-1 bg-cyan-400" @click="jumpPage">xxxx{{ textRef }}dd {{ t('home') }}d</div>
</template>
<script lang="ts" setup>
defineOptions({
	name: 'Home',
});

const router = useRouter();

const jumpPage = () => {
	router.push('/home');
};
// import { ref } from 'vue';
const textRef = ref('skss');
const { t } = useI18n();
</script>

<style></style>
<route> { meta: { layout: 'base' } } </route>
