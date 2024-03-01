import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Chip } from 'react-native-paper';
import { moderateScale } from 'react-native-size-matters';

export type MovieMembersProps = {
  role: string;
  members: string[];
};

export function MovieMembers({ role, members }: MovieMembersProps) {
  return (
    <View style={styles.container}>
      <Text variant="labelSmall" style={styles.membersRole}>
        {role}
      </Text>
      <View style={styles.memberList}>
        {members.map((name) => (
          <Chip key={name}>{name}</Chip>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: moderateScale(18)
  },
  membersRole: {
    textTransform: 'uppercase',
    marginBottom: moderateScale(4)
  },
  memberList: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    gap: moderateScale(4)
  }
});
