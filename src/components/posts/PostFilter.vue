<template>
  <form @submit.prevent="">
    <div class="row g-3 d-flex justify-content-between mb-5">
      <div class="select-btn col-3 col-lg-2">
        <select
          :value="limit"
          class="form-select"
          @input="$emit('update:limit', $event.target.value)"
        >
          <option value="9">9개씩</option>
          <option value="6">6개씩</option>
          <option value="3">3개씩</option>
        </select>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          fill="#50a486"
          class="bi bi-caret-down-fill"
          viewBox="0 0 16 16"
        >
          <path
            d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
          />
        </svg>
      </div>
      <div class="col-5 col-lg-3">
        <div class="input-group input-btn">
          <input
            :value="title"
            type="text"
            class="form-control"
            @input="$emit('update:title', $event.target.value)"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="#50a486"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
            />
          </svg>
        </div>
      </div>
    </div>
  </form>
</template>

<script setup>
defineProps({
  title: String,
  limit: Number
});
defineEmits(['update:title', 'update:limit']);
</script>

<style scoped>
input:focus {
  outline: none !important;
  border: none !important;
  box-shadow: none !important;
  background: transparent;
  box-sizing: border-box;
}
.input-btn {
  position: relative;
  border-radius: 30px !important;
  overflow: hidden;
  background-color: #e6e6e6;
}
.input-btn svg {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
}
.form-control {
  min-height: 38px;
  background-color: #e6e6e6;
  font-size: 16px;
  border: none;
  border-radius: 10px;
  outline: none;
  padding-right: 40px;
  color: #50a486;
}

.select-btn {
  position: relative;
}
.select-btn svg {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}

.form-select {
  background: #e6e6e6;
  font-size: 14px;
  color: #50a486;
  cursor: pointer;
  min-height: 38px;
}
</style>
