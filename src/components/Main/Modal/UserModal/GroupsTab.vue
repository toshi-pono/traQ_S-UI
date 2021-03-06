<template>
  <div :class="$style.groups">
    <template v-if="isLoading">Now loading...</template>
    <template v-else>
      <ul :class="$style.list">
        <li
          v-for="group in groups"
          :key="group.id"
          :class="$style.group"
          @click="onGroupClick(group.id)"
        >
          <icon name="group" :class="$style.icon" :size="20" />
          {{ group.name }}
        </li>
      </ul>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, PropType } from '@vue/composition-api'
import store from '@/store'
import { UserDetail } from '@traptitech/traq'
import { UserGroupId } from '@/types/entity-ids'
import Icon from '@/components/UI/Icon.vue'

export default defineComponent({
  name: 'GroupsTab',
  props: {
    detail: Object as PropType<UserDetail>
  },
  setup(props) {
    const isLoading = computed(() => props.detail === undefined)
    const groups = computed(
      () =>
        props.detail?.groups.map(
          groupId => store.state.entities.userGroups[groupId]
        ) ?? []
    )

    const onGroupClick = (id: UserGroupId) => {
      store.dispatch.ui.modal.pushModal({
        type: 'group',
        id
      })
    }

    return { isLoading, groups, onGroupClick }
  },
  components: {
    Icon
  }
})
</script>

<style lang="scss" module>
.groups {
  @include color-ui-primary;
  height: 100%;
}

.list {
  overflow-y: scroll;
  min-height: 100%;
}

.group {
  margin: 16px 8px;
  cursor: pointer;
  &:first-child {
    // ナビゲーションと頭を揃える
    margin-top: 8px;
  }
}

.icon {
  vertical-align: bottom;
  margin-right: 4px;
}
</style>
