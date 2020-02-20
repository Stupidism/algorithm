class Solution:
  def numUniqueEmails(self, emails) -> int:
    root = {}
    count = 0

    for email in emails:
      node = root
      local, domain = email.split('@')

      for c in local:
        if (c == '.'):
          continue
        if (c == '+'):
          break
        node[c] = node.get(c, {})
        node = node[c]
      
      c = '@'
      node[c] = node.get(c, {})
      node = node[c]
      
      for c in domain:
        node[c] = node.get(c, {})
        node = node[c]

      # print('email', local, domain, node)
      if (not 'isEnd' in node):
        node['isEnd'] = True
        count += 1

    # print(count, root)
    return count
    
assert Solution().numUniqueEmails(["test.email+alex@leetcode.com","test.e.mail+bob.cathy@leetcode.com","testemail+david@lee.tcode.com"]) == 2
assert Solution().numUniqueEmails(["test.email+alex@leetcode.com","test.email.leet+alex@code.com"]) == 2
