import React from 'react';
import {StyleSheet} from 'react-native';
import FastImage from 'react-native-fast-image';
import {ImageType} from '../redux/types';
interface Props {
  item: ImageType;
}
const Tile: React.FC<Props> = ({item}) => {
  const imageURI = `https://farm${item.farm}.static.flickr.com/${item.server}/${item.id}_${item.secret}.jpg`;
  //console.log(imageURI);
  //return <Image source={{uri: imageURI}} style={styles.image} />;
  return (
    <FastImage
      style={styles.image}
      source={{
        uri: imageURI,
        priority: FastImage.priority.normal,
      }}
      resizeMode={FastImage.resizeMode.contain}
    />
  );
};
export default Tile;
const styles = StyleSheet.create({
  image: {
    height: 100,
    width: '50%',
  },
});
