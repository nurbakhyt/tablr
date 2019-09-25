<template>
	<div class="card">
		<p
			v-if="item.isMain"
			class="card__title card__title--main"
		>
			<span>Часы работы</span>
			<span class="card__title--status">
				{{ item.status }}
			</span>
		</p>
		<p
			v-else
			class="card__title"
		>
			<span>{{ item.name }}</span>
			<span class="card__title--status">
				<svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
					<circle cx="5" cy="5" r="5" fill="#737373"/>
				</svg>
				{{ item.status }}
			</span>
		</p>

		<schedule-card-row
			v-for="(row, i) in item.daysByTime"
			:key="i"
			:item="row"
			class="card__row"
		/>
	</div>
</template>

<script>
import ScheduleCardRow from './ScheduleCardRow';

export default {
	name: 'Card',
	components: {
		ScheduleCardRow,
	},
	props: {
		item: {
			type: Object,
			required: true,
		}
	},
}
</script>

<style lang="scss" scoped>
	.card {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		font-size: 14px;
		line-height: 17px;
		margin-bottom: 10px;
		padding-bottom: 5px;

		&:last-child {
			border-bottom: none;
			margin-bottom: 0;
			padding-bottom: 0;
		}

		&__title {
			display: flex;
			justify-content: space-between;
			color: rgba(0, 0, 0, 0.89);
			margin-bottom: 5px;
			text-align: left;

			&--main {
				justify-content: flex-start;
				font-size: 18px;
				line-height: 21px;
				margin-bottom: 14px;
				
				& > span:first-child {
					margin-right: 10px;
				}
			}

			&--status {
				color: rgba(0, 0, 0, 0.67);

				& > svg {
					margin-right: 5px;
				}
			}
		}

		&__row {
			color: rgba(0, 0, 0, 0.67);
			display: flex;
			justify-content: space-between;
			margin-bottom: 5px;

			&:last-child {
				margin-bottom: 0;
			}
		}
	}
</style>
