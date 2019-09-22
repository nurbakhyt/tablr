<template>
  <form
    class="place-input"
    @submit="onSubmit"
  >
    <label
      class="place-input__label"
      for="name"
    >
      Слаг заведения
    </label>
    
    <input
      id="name"
      v-model="key"
      type="text"
      class="place-input__field"
    >

    <button
      type="submit"
      class="place-input__btn"
    >
      {{ bntText }}
    </button>
  </form>
</template>

<script>
import {mapState, mapActions} from 'vuex';

export default {
  name: 'PlaceInput',
  computed: {
    ...mapState(['name', 'loading']),
    bntText() {
      if (this.loading) {
        return 'Загрузка';
      }

      return 'Обновить';
    },
    key: {
      get() {
        return this.name;
      },
      set(val) {
        this.setPlaceName(val);
      }
    }
  },
  methods: {
    ...mapActions(['setPlaceName', 'fetchPlace']),
    onSubmit: function(e) {
      e.preventDefault();
      
      this.fetchPlace();
    },
  },
}
</script>

<style scoped lang="scss">
  .place-input {
    text-align: left;
    margin-bottom: 40px;

    &__label,
    &__field {
      display: block;
      font-size: 14px;
      line-height: 17px;
    }

    &__label {
      margin-bottom: 5px;
    }

    &__field {
      background-color: #fff;
      border: 1px solid rgba(0, 0, 0, 0.1);
      border-radius: 3px;
      height: 30px;
      margin-bottom: 20px;
      max-width: 300px;
      padding-right: 10px;
      padding-left: 10px; 
      width: 100%;
    }

    &__btn {
      background-color: #EE514A;
      border: none;
      border-radius: 3px;
      color: #fff;
      font-family: 'Rubik', sans-serif;
      font-size: 18px;
      font-weight: 500;
      line-height: 21px;
      height: 50px;
      max-width: 260px;
      width: 100%;
    }
  }
</style>
