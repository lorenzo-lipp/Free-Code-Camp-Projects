import hashlib

def crack_sha1_hash(hash, use_salts=False):
  f = open('./top-10000-passwords.txt', "r", encoding='utf-8')
  
  for line in f:
    m = hashlib.sha1()
    m.update(line.strip().encode('utf-8'))
    pass_hash = m.hexdigest()
  
    if pass_hash == hash:
      f.close()
      return line.strip()
  
    if use_salts:
      s = open('./known-salts.txt', "r", encoding='utf-8')
      for salt in s:
        m = hashlib.sha1()
        m.update((line.strip() + salt.strip()).encode('utf-8'))
        pass_hash = m.hexdigest()
        
        if pass_hash == hash:
          f.close()
          s.close()
          return line.strip()
          
        m = hashlib.sha1()
        m.update((salt.strip() + line.strip()).encode('utf-8'))
        pass_hash = m.hexdigest()
        
        if pass_hash == hash:
          f.close()
          s.close()
          return line.strip()
      s.close()

  f.close()
  return "PASSWORD NOT IN DATABASE"
        

  