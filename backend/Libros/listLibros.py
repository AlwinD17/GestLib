class AVLNode:
    def __init__(self, isbn, libro):
        self.isbn = isbn
        self.libro = libro
        self.height = 1
        self.left = None
        self.right = None

class AVLTree:
    def __init__(self):
        self.root = None

    def insert(self, isbn, libro):
        self.root = self._insert(self.root, isbn, libro)

    def _insert(self, node, isbn, libro):
        if not node:
            return AVLNode(isbn, libro)
        
        if isbn < node.isbn:
            node.left = self._insert(node.left, isbn, libro)
        elif isbn > node.isbn:
            node.right = self._insert(node.right, isbn, libro)
        else:
            return node

        node.height = 1 + max(self._get_height(node.left), self._get_height(node.right))

        balance = self._get_balance(node)

        if balance > 1 and isbn < node.left.isbn:
            return self._right_rotate(node)

        if balance < -1 and isbn > node.right.isbn:
            return self._left_rotate(node)

        if balance > 1 and isbn > node.left.isbn:
            node.left = self._left_rotate(node.left)
            return self._right_rotate(node)

        if balance < -1 and isbn < node.right.isbn:
            node.right = self._right_rotate(node.right)
            return self._left_rotate(node)

        return node

    def find(self, isbn):
        return self._find(self.root, isbn)

    def _find(self, node, isbn):
        if not node or node.isbn == isbn:
            return node.libro if node else None

        if isbn < node.isbn:
            return self._find(node.left, isbn)
        
        return self._find(node.right, isbn)

    def inorder(self):
        results = []
        self._inorder(self.root, results)
        return sorted(results, key=lambda x: x.libro.title)  # Ordena por título

    def _inorder(self, node, results):
        if not node:
            return
        self._inorder(node.left, results)
        results.append(node)
        self._inorder(node.right, results)

    def _left_rotate(self, z):
        y = z.right
        T2 = y.left
        y.left = z
        z.right = T2
        z.height = 1 + max(self._get_height(z.left), self._get_height(z.right))
        y.height = 1 + max(self._get_height(y.left), self._get_height(y.right))
        return y

    def _right_rotate(self, z):
        y = z.left
        T3 = y.right
        y.right = z
        z.left = T3
        z.height = 1 + max(self._get_height(z.left), self._get_height(z.right))
        y.height = 1 + max(self._get_height(y.left), self._get_height(y.right))
        return y

    def _get_height(self, node):
        if not node:
            return 0
        return node.height

    def _get_balance(self, node):
        if not node:
            return 0
        return self._get_height(node.left) - self._get_height(node.right)
    
    def delete(self, isbn):
        self.root = self._delete(self.root, isbn)

    def _delete(self, node, isbn):
        if not node:
            return None
        if isbn < node.isbn:
            node.left = self._delete(node.left, isbn)
        elif isbn > node.isbn:
            node.right = self._delete(node.right, isbn)
        else:
            if not node.left and not node.right:
                return None
            if not node.left:
                return node.right
            if not node.right:
                return node.left
            min_node = self._find_min(node.right)
            node.isbn = min_node.isbn
            node.libro = min_node.libro
            node.right = self._delete(node.right, min_node.isbn)
        node.height = 1 + max(self._get_height(node.left), self._get_height(node.right))
        balance = self._get_balance(node)
        if balance > 1:
            if self._get_balance(node.left) >= 0:
                return self._right_rotate(node)
            else:
                node.left = self._left_rotate(node.left)
                return self._right_rotate(node)
        if balance < -1:
            if self._get_balance(node.right) <= 0:
                return self._left_rotate(node)
            else:
                node.right = self._right_rotate(node.right)
                return self._left_rotate(node)
        return node

    def _find_min(self, node):
        while node.left:
            node = node.left
        return node
