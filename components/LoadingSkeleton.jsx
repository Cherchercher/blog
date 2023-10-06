import ContentLoader from 'react-content-loader';

export default function LoadingSkeleton() {
    return (
      // <div className="flex justify-center max-w-screen-md mx-auto my-24">
        <ContentLoader
          speed={2}
          width={'100%'}
          height={'100%'}
          viewBox="0 0 557 305"
          backgroundColor="#f5f5f5"
          foregroundColor="#efefef"
        >
          <rect x="0" y="0" rx="3" ry="3" width="370" height="30" />
          <rect x="0" y="190" rx="4" ry="4" width="72" height="15" />
          <rect x="0" y="90" rx="4" ry="4" width="557" height="15" />
          <rect x="0" y="115" rx="4" ry="4" width="305" height="15" />
          <rect x="0" y="140" rx="4" ry="4" width="557" height="15" />
          <rect x="0" y="165" rx="4" ry="4" width="557" height="15" />
          <rect x="0" y="215" rx="4" ry="4" width="418" height="15" />
          <rect x="0" y="240" rx="4" ry="4" width="557" height="15" />
          <rect x="0" y="265" rx="4" ry="4" width="533" height="15" />
          <rect x="0" y="290" rx="4" ry="4" width="344" height="15" />
          <rect x="0" y="43" rx="3" ry="3" width="431" height="21" />
        </ContentLoader>
      // </div>
    );
  };
  