<template>
  <div class="dh-sizer-keyword-time">
    <el-select
      :placeholder="placeholder"
      :multiple="multiple"
      :clearable="clearable"
      :filterable="filterable"
      v-model="selectedValue"
      @change="change"
    >
      <el-option
        v-for="item in options"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  name: "<%=libraryName%>",
  props: {
    value: {
      type: Array,
      default: () => {
        return [];
      }
    },
    placeholder: {
      type: String,
      default: ''
    },
    multiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    filterable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      options: [{
        
      }],
      selectedValue: ''
    };
  },
  methods: {
    change(value) {
      this.$emit('input', [value]);
    },
    formatArrayToArray(array = [], value, label) {
      const arr = [];
      array.map(item => {
        arr.push({
          value: item[value] + '',
          label: item[label]
        });
      });
      return arr;
    }
  },
  mounted() {
    this.$api
      .getConfig({
        system_alias: 'sales',
        module_alias: 'clue_lable',
        key: 'level'
      })
      .then(data => {
        this.options = this.formatArrayToArray(data, 'id', 'text');
        this.$mpNoticeReady();
      })
      .catch(error => {
        this.$mpNoticeReady();
        console.log(error); // eslint-disable-line
      });
  }
};
</script>

<style scoped>
.dh-sizer-keyword-time {
  display: flex;
  align-items: center;
}
.flex-item {
  margin-right: 8px;
}
</style>
