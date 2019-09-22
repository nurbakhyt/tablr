<template>
  <div class="schedule">
		<card
      v-for="(item, i) in items"
      :key="i"
			:item="item"
    />
	</div>
</template>

<script>
import Card from './ScheduleCard.vue';

export default {
  name: 'Schedule',
  components: {
    Card,
	},
	props: {
		items: {
			type: Array,
			required: true,
		}
	},
}
</script>

<style scoped lang="scss">
	.schedule {
		background-color: #fff;
		border: 1px solid rgba(0, 0, 0, 0.1);
		border-radius: 5px;
		padding: 10px;
	}
</style>
