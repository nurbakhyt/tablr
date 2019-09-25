<template>
	<p>
		<span>
			{{ item.days }}
		</span>
		<span>
			{{ item.time }}
		</span>
	</p>
</template>

<script>
export default {
	name: 'ScheduleCardRow',
	props: {
		item: {
			type: Object,
			required: true,
		}
	},
}
</script>

<style scoped lang="scss">

</style>
