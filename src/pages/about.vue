<template>
	<div class="b-1 bg-cyan-400">xxxx{{ textRef }}dd {{ t('home') }}d</div>
	222
</template>
<script lang="ts" setup>
defineOptions({
	name: 'Home',
});
// import { ref } from 'vue';
const textRef = ref('skss');
const { t } = useI18n();
</script>

<style></style>
<route> { meta: { layout: 'admin' } } </route>
