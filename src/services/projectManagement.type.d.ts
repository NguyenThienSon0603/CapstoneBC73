declare type ProjectResponse = {
    statusCode: number
    content: [{
        members: [{
            userId: number
            name: string
            avatar: string
        }]
        creator: {
            id: number
            name: string
        }
        id: number
        projectName: string
        description: string
        categoryId: number
        categoryName: string
    }]
}

declare type ProjectRequest = {
    projectName: string
    description: string
    categoryId: number
    alias: string
}