export const adminMenu = [
    //Quản lý người dùng
    {
        name: 'menu.admin.user', menus: [
            {
                name: 'menu.admin.crud', link: "/system/user-manage"
            },
            {
                name: 'menu.admin.crud-redux', link: "/system/user-redux"
            },
            {
                name: 'menu.admin.manage-admin', link: "/system/admin-manage"
            },
            {
                name: 'menu.admin.manage-doctor', link: "/system/doctor-manage"
                // subMenus: [
                //     { name: 'menu.system.system-administrator.user-manage', link: '/system/user-manage' },
                //     { name: 'menu.system.system-administrator.user-redux', link: '/system/user-redux' },
                // ]
            },
            //Quản lý kế hoạch khám bệnh

            {
                name: 'menu.doctor.manage-schedule', link: "/doctor/manage-schedule"
            }
        ]
    },
    //quản lý phòng khám
    {
        name: 'menu.admin.clinic', menus: [
            {
                name: 'menu.admin.manage-clinic', link: "/system/clinic-manage"
            }
        ]
    },
    //Quản lý chuyên khoa
    {
        name: 'menu.admin.specialty', menus: [
            {
                name: 'menu.admin.manage-specialty', link: "/system/specialty-manage"
            }
        ]
    },
    //quản lý cẩm nang
    {
        name: 'menu.admin.handbook', menus: [
            {
                name: 'menu.admin.manage-handbook', link: "/system/handbook-manage"
            }
        ]
    },

]

//doctor
export const doctorMenu = [
    //Quản lý kế hoạch khám bệnh
    {
        name: 'menu.admin.manage-user', menus: [

            {
                name: 'menu.doctor.manage-schedule', link: "/doctor/manage-schedule"
            }
        ]
    }
]