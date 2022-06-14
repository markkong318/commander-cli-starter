store_get() {
  VARIABLE=$(printf '%s\n' $1 | awk '{ print toupper($0) }')

  if [ ! -z "${!VARIABLE}" ]
  then
    echo ${!VARIABLE}
  else
    echo "$([[ ! -f ${BATS_TMPDIR}/starter.$1 ]] || (cat ${BATS_TMPDIR}/starter.$1))"
  fi
}

store_exist() {
  VARIABLE=$(printf '%s\n' $1 | awk '{ print toupper($0) }')

  if [ ! -z "${!VARIABLE}" ]; then
    echo 0
  fi

  if [ -f ${BATS_TMPDIR}/starter.$1 ]; then
    echo 0
  fi

  echo 1
}

store_set() {
  echo $2 > ${BATS_TMPDIR}/starter.$1
}

store_rm() {
  rm -rf ${BATS_TMPDIR}/starter.$1
}
