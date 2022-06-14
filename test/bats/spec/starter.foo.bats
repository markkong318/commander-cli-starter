#!/usr/bin/env bats

load '../../../node_modules/bats-support/load'
load '../../../node_modules/bats-assert/load'

load '../lib/store'
load '../lib/assert'

setup() {
  [ ! -f ${BATS_PARENT_TMPNAME}.skip ] || skip "skip remaining tests"
}

@test "foo" {
  run node ../../src/index foo
  assert_success
}

teardown() {
    [ -n "$BATS_TEST_COMPLETED" ] || touch ${BATS_PARENT_TMPNAME}.skip
}
