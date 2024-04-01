<script lang="ts">
import { defineComponent } from 'vue';
import ArrowTopIcon from '@/components/Icons/ArrowTopIcon.vue';

export default defineComponent({
  components: { ArrowTopIcon },
  props: {
    field: String,
    activeField: String,
    order: String // as PropType<'' | 'asc' | 'desc'>
  }
});
</script>

<template>
  <div class="w-3 h-3 flex flex-col items-center justify-center">
    <arrow-top-icon
      class="w-[6px] h-[6px]"
      :class="{
        'text-black': activeField === field && order === 'asc',
        'text-semigray': activeField !== field
      }" />
    <arrow-top-icon
        style="transform: rotate(180deg)"
      class="w-[6px] h-[6px] rotate-180"
      :class="{
        'text-black': activeField === field && order === 'desc',
        'text-semigray': activeField !== field
      }" />
  </div>
</template>

<style scoped>

.text-black{
  color: #000;
}

.text-semigray{
  color: #aaa;
}
</style>