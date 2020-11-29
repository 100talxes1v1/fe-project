export default {
  "layout": [
    {
      "mode": "flex",
      "type": "row",
      "children": [
        "operate_time",
        "data_id",
        "search_action",
        "clear_search"
      ],
      "split_line": true
    },
    {
      "type": "row",
      "children": [
        "data_table"
      ]
    }
  ],
  "content": [
    {
      "grid": 12,
      "type": "calendar",
      "label": "操作时间：",
      "key_name": ["start_time","end_time"],
      "component_id": "operate_time",
      "mode": "datetimerange",
      "default_value": ["", ""]
    },
    {
      "grid": 8,
      "type": "text",
      "label": "主数据ID：",
      "key_name": "uid",
      "component_id": "data_id"
    },
    {
      "main": true,
      "type": "interaction",
      "label": "搜索",
      "logic": "search_action_1",
      "trigger": {
        "load": true,
        "watch": [
          "start_time",
          "end_time",
          "uid",
          "page",
          "page_size"
        ],
        "button": true
      },
      "component_id": "search_action",
      "authority_code": "",
      "show_condition": ""
    },
    {
      "main": false,
      "type": "interaction",
      "label": "重置",
      "logic": "search_action_clean",
      "trigger": {
        "load": false,
        "button": true
      },
      "component_id": "clear_search",
      "authority_code": "",
      "show_condition": ""
    },
    {
      "type": "js",
      "script": `function(prevResult) {
        let ajaxData = {
          page_size: $dataModel.page_size,
          page: $dataModel.page
        }
        if ($dataModel.start_time && $dataModel.end_time) {
          ajaxData['start_time'] = $dataModel.start_time/1000
          ajaxData['end_time'] = $dataModel.end_time/1000
        }
        if ($dataModel.uid) {
          ajaxData['uid'] = $dataModel.uid
        }
        return {
          next: 'search_action_2',
          params: ajaxData
        }
      }`,
      "component_id": "search_action_1"
    },
    {
      "type": "js",
      "script": `function(prevResult) {
        
      }`,
      "component_id": "search_action_clean"
    },
    {
      "uri": "/api/log/list",
      "next": "",
      "type": "ajax",
      "method": "get",
      "target": {
        "total": "total",
        "dataList": "list"
      },
      "component_id": "search_action_2"
    },
    {
      "type": "table",
      "columns": [
        {
          "field": {
            "type": 'datetime',
            "format": 'yyyy-MM-dd HH:mm:ss',
            "key_name": "created_at",
            "sortable": false
          },
          "fixed": "left",
          "label": "操作时间",
          "width": "200px"
        },
        {
          "field": {
            "type": "raw",
            "key_name": "Created_name",
            "sortable": false
          },
          "fixed": "left",
          "label": "操作人员",
          "width": "200px"
        },
        {
          "field": {
            "type": "raw",
            "key_name": "uid"
          },
          "label": "主数据ID",
          "width": "100px"
        },
        {
          "field": {
            "type": "raw",
            "key_name": "diff"
          },
          "label": "变更信息",
          "width": "300px"
        },
        {
          "field": {
            "type": "raw",
            "key_name": "terrace",
          },
          "label": "所属平台",
          "width": "240px"
        },
        {
          "field": {
            "type": "raw",
            "key_name": "project"
          },
          "label": "功能名称",
          "width": "100px"
        },
        {
          "field": {
            "type": "raw",
            "key_name": "log",
            "sortable": false
          },
          "label": "详细日志",
          "width": "100px"
        }
      ],
      "key_name": "dataList",
      "page_size": "page_size",
      "page_index": "page",
      "total_count": "total",
      "component_id": "data_table"
    },
    {
      "type": "hidden",
      "key_name": "total",
      "default_value": 0,
      "show_condition": false
    },
    {
      "type": "hidden",
      "key_name": "page",
      "default_value": 1,
      "show_condition": false
    },
    {
      "type": "hidden",
      "key_name": "page_size",
      "default_value": 10,
      "show_condition": false
    }
  ]
}