import ContentLoader from 'react-content-loader'

const ViewPreviewSkeleton = () => (
    <ContentLoader
        speed={2}
        width={430}
        height={300}
        viewBox='0 0 430 300'
        backgroundColor='#f3f3f3'
        foregroundColor='#ecebeb'
    >
        <rect x='0' y='0' rx='10' ry='10' width='430' height='250' />
    </ContentLoader>
)

export default ViewPreviewSkeleton
