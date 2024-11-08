<template>
  <form @submit.prevent="">
    <div class="d-flex justify-content-between mb-4 flex-row gap-2">
      <div>
        <div class="input-group input-search d-flex gap-2">
          <input
            :value="title"
            type="text"
            class="form-control text-sub bg-white rounded-5"
            placeholder="검색어를 입력해주세요"
            @input="$emit('update:title', $event.target.value)"
          /><svg
            xmlns="http://www.w3.org/2000/svg"
            width="25"
            height="25"
            fill="#9fe0c9"
            class="bi bi-search"
            viewBox="0 0 16 16"
          >
            <path
              d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"
            />
          </svg>
        </div>
      </div>
      <div class="d-flex flex-row gap-2 align-self-end">
        <div class="func-wrap gap-2 justify-content-between">
          <button class="btn btn-sub" @click="$emit('list', 'list')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#6edbb4"
              class="bi bi-square-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2z"
              />
            </svg></button
          ><button class="btn btn-sub" @click="$emit('list', 'grid')">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="#6edbb4"
              class="bi bi-grid-fill"
              viewBox="0 0 16 16"
            >
              <path
                d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5zm8 0A1.5 1.5 0 0 1 10.5 9h3a1.5 1.5 0 0 1 1.5 1.5v3a1.5 1.5 0 0 1-1.5 1.5h-3A1.5 1.5 0 0 1 9 13.5z"
              />
            </svg>
          </button>
        </div>
        <div class="position-relative">
          <select
            :value="Number(limit)"
            class="form-select"
            @input="$emit('update:limit', Number($event.target.value))"
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
      </div>
    </div>
  </form>
</template>

<script setup>
defineProps({
  title: String,
  limit: Number
});
defineEmits(['update:title', 'update:limit', 'list', 'grid']);
</script>

<style scoped>
/* search section */
.input-search svg {
  position: absolute;
  left: 10px;
  top: 50%;
  transform: translateY(-50%);
  pointer-events: none;
  z-index: 5;
}
.input-search .form-control {
  padding-left: 40px;
  border: 1px solid #9fe0c9 !important;
}

/* button, select section */
.func-wrap {
  display: flex;
  position: relative;
  vertical-align: middle;
}
.func-wrap .btn {
  padding: 0 10px;
  /* max-height: 38px; */
}

.form-select {
  min-width: 83px;
}
.form-select + svg {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
}
@media (max-width: 590px) {
  .func-wrap {
    display: none;
  }
}
</style>
