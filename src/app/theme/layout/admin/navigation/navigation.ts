export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  badge?: {
    title?: string;
    type?: string;
  };
  children?: NavigationItem[];
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'navigation',
    title: 'Navigation',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'dashboard',
        title: 'Home',
        type: 'item',
        url: '/analytics',
        icon: 'feather icon-home'
      }
    ]
  },
  /*{
    id: 'requisition',
    title: 'Requisition',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'basic-requisition',
        title: 'Requisition',
        type: 'collapse',
        icon: 'feather icon-layers',
        children: [
          {
            id: 'create-requisition',
            title: 'Create',
            type: 'item',
            url: '/requisition/create-requisition'
          },
          {
            id: 'fulfill-requisition',
            title: 'Fulfill',
            type: 'item',
            url: '/requisition/fulfill-requisition'
          },
          {
            id: 'view-quotes',
            title: 'View Quotes',
            type: 'item',
            url: '/requisition/view-quotes'
          }
        ]
      }
    ]
  },*/
  {
    id: 'vehicle-records',
    title: 'Vehicle Records',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'master-record',
        title: 'Master Record',
        type: 'item',
        url: '/vehicle-records/master-record',
        icon: 'feather icon-save'
      },
      {
        id: 'create-record',
        title: 'Create',
        type: 'collapse',
        icon: 'feather icon-plus',
        children: [
          {
            id: 'upload-record',
            title: 'Upload',
            type: 'item',
            url: '/vehicle-records/create-record/upload'
          },
          {
            id: 'capture-record',
            title: 'Capture',
            type: 'item',
            url: '/vehicle-records/create-record/capture'
          }
        ]
      },
      {
        id: 'record-reporting',
        title: 'Reporting',
        type: 'collapse',
        icon: 'feather icon-file-text',
        children: [
          {
            id: 'size-reporting',
            title: 'Size',
            type: 'item',
            url: '/vehicle-records/record-reporting/size-reporting'
          },
          {
            id: 'spend-reporting',
            title: 'Spend',
            type: 'item',
            url: '/vehicle-records/record-reporting/spend-reporting'
          }
        ]
      }
    ]
  },
  /*{
    id: 'ui-component',
    title: 'Ui Component',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'basic',
        title: 'Component',
        type: 'collapse',
        icon: 'feather icon-box',
        children: [
          {
            id: 'button',
            title: 'Button',
            type: 'item',
            url: '/component/button'
          },
          {
            id: 'badges',
            title: 'Badges',
            type: 'item',
            url: '/component/badges'
          },
          {
            id: 'breadcrumb-pagination',
            title: 'Breadcrumb & Pagination',
            type: 'item',
            url: '/component/breadcrumb-paging'
          },
          {
            id: 'collapse',
            title: 'Collapse',
            type: 'item',
            url: '/component/collapse'
          },
          {
            id: 'tabs-pills',
            title: 'Tabs & Pills',
            type: 'item',
            url: '/component/tabs-pills'
          },
          {
            id: 'typography',
            title: 'Typography',
            type: 'item',
            url: '/component/typography'
          }
        ]
      }
    ]
  },
  {
    id: 'chart',
    title: 'Chart',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'apexchart',
        title: 'ApexChart',
        type: 'item',
        url: '/chart',
        classes: 'nav-item',
        icon: 'feather icon-pie-chart'
      }
    ]
  },
  {
    id: 'forms & tables',
    title: 'Forms & Tables',
    type: 'group',
    icon: 'icon-group',
    children: [
      {
        id: 'forms',
        title: 'Basic Forms',
        type: 'item',
        url: '/forms',
        classes: 'nav-item',
        icon: 'feather icon-file-text'
      },
      {
        id: 'tables',
        title: 'Tables',
        type: 'item',
        url: '/tables',
        classes: 'nav-item',
        icon: 'feather icon-server'
      }
    ]
  }*/
];
