// type ShortItemProps = {
//     index: number;
//     visible: boolean;
//     playing: boolean;
//     paused: boolean;
//     url: string;
//     layout: LayoutRectangle;
//   };
//   function ShortItem({visible, playing, url, layout}: ShortItemProps) {
//     const youtubeId = getYoutubeIdFromURL(url);
//     const youtubePlayerRef = useRef<YoutubeIframeRef>(null);
//   return (
//       <YoutubePlayer
//         ref={youtubePlayerRef}
//         height={layout.height}
//         width={layout.width}
//         videoId={youtubeId}
//         play={playing}
//         onChangeState={event => {
//           if (event === 'ended' && visible) {
//             youtubePlayerRef?.current?.seekTo(0, true);
//           }
//         }}
//         webViewProps={{
//           injectedJavaScript: `
//             var element = document.getElementsByClassName('container')[0];
//             element.style.position = 'unset';
//             true;
//           `,
//         }}
//       />
//     );
//   }
//   export default ShortItem;