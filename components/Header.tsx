import { Text, View } from 'react-native'
import { StyleSheet } from 'react-native'
import { colors, fonts } from '@/theme'

export const Header = ({ title, subtitle }) => {
  return (
    <View style={styles.header}>
      <Text style={styles.headerHeading}>{title}</Text>
      <Text style={styles.headerSubheading}>{subtitle}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 42
  },
  headerHeading: {
    color: colors.text,
    fontFamily: fonts.semiBold,
    fontSize: fonts.lg,
    marginBottom: 12
  },
  headerSubheading: {
    color: colors.text,
    fontFamily: fonts.extraLight,
    fontSize: fonts.sm
  }
})